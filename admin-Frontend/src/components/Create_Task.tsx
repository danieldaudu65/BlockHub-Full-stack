import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { API_URL } from '../confiq';

interface PopupProps {
  onClose: () => void;
  refresh: () => void;
}

const Create_Task: React.FC<PopupProps> = ({ onClose,refresh }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [durationInHour, setdurationInHour] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = () => setIsImportant(prev => !prev);

  const handleSubmit = async () => {
    if (!title || !description || !points) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/admin_tasks/add_task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          points: parseInt(points),
          important: isImportant,
          durationInHours:durationInHour
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Something went wrong');
      } else {
        toast.success('Task created');
        onClose(); // close modal
        refresh()
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-6 m-2 bg-[#151718]'>
      <div className='flex justify-between items-center'>
        <h2>Create New Task</h2>
        <div onClick={onClose} className='bg-[#93949683] p-1.5 rounded-full cursor-pointer'>
          <FaTimes className='text-[#939496] text-sm' />
        </div>
      </div>

      <div className='my-6'>
        <div className='flex flex-col'>
          <label className='text-white mb-2'>Title</label>
          <input
            type='text'
            placeholder='Enter title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='border border-gray-800 rounded-md my-2 px-3 text-gray-400 bg-[#181819] py-4 outline-none text-sm'
          />
        </div>

        <div className='flex flex-col'>
          <label className='text-white mb-2'>Description</label>
          <input
            type='text'
            placeholder='Enter description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='border border-gray-800 rounded-md my-2 px-3 text-gray-400 bg-[#181819] py-4 outline-none text-sm'
          />
        </div>

        <div className='flex mt-2 flex-col'>
          <label className='text-white mb-2'>Points</label>
          <input
            type='number'
            placeholder='Assign point to task'
            value={points}
            onChange={e => setPoints(e.target.value)}
            className='border border-gray-800 rounded-md my-2 px-3 text-gray-400 bg-[#181819] py-4 outline-none text-sm'
          />
        </div>
        <div className='flex mt-2 flex-col'>
          <label className='text-white mb-2'>Time Frame</label>
          <input
            type='number'
            placeholder='Duration of Task in Hours'
            value={durationInHour}
            onChange={e => setdurationInHour(e.target.value)}
            className='border border-gray-800 rounded-md my-2 px-3 text-gray-400 bg-[#181819] py-4 outline-none text-sm'
          />
        </div>

        <div className='my-4 flex w-full justify-between items-center'>
          <p className='font-medium'>Is it important?</p>
          <div className='flex flex-col items-end'>
            <div
              onClick={toggle}
              className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-300 ${isImportant ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isImportant ? 'translate-x-5' : ''}`}
              />
            </div>
            <p className='mt-2 text-sm text-gray-400'>{isImportant ? 'Important' : 'Not Important'}</p>
          </div>
        </div>

        <button
          disabled={loading}
          onClick={handleSubmit}
          className='text-white w-full py-3 rounded-md my-4 flex justify-center bg-blue-main disabled:opacity-50'
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </div>
    </div>
  );
};

export default Create_Task;
