import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { API_URL } from '../confiq';
import { ClipLoader } from 'react-spinners';

interface PopupProps {
  item: any;
  onClose: () => void;
  token: string | null;
  refetchTasks: () => void;
}

const Edit_Task: React.FC<PopupProps> = ({ onClose, item, token, refetchTasks }) => {
  const [title, setTitle] = useState(item?.title || '');
  // const [id, setId] = useState(item?.id || '');
  const [description, setDescription] = useState(item?.description || '');
  const [points, setPoints] = useState(item?.points || '');
  const [isOn, setIsOn] = useState<boolean>(item?.important || false);
  const [loading, setLoading] = useState(false);

  // Toggle function
  useEffect(() => {
    if (item) {
      setIsOn(item.important);
    }
  }, [item]);
  const toggle = () => setIsOn((prev) => !prev);


  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin_tasks/edit_task`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskId: item.id,
          token,
          updatedData: {
            title,
            description,
            points,
            important: isOn,
          },
        }),
      });


      const data = await res.json();

      // console.log('Task update successfully : ' , data);
      
      if (!res.ok) throw new Error(data.message || 'Failed to update task');

      toast.success('Task updated successfully');
      refetchTasks();
      onClose();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-6 m-2 bg-[#151718]'>
      <div className='flex justify-between items-center'>
        <h2>Edit Task</h2>
        <div onClick={onClose} className='bg-[#93949683] p-1.5 rounded-full cursor-pointer'>
          <FaTimes className='text-[#939496] text-sm' />
        </div>
      </div>

      <div className='my-6'>
        <div className='flex flex-col'>
          <label className='text-white mb-2'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter title'
            className='border border-gray-800 rounded-md my-2 px-3 text-gray-400 bg-[#181819] py-4 outline-none text-sm'
          />
        </div>

        <div className='flex flex-col'>
          <label className='text-white mb-2'>Description</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Enter description'
            className='border border-gray-800 rounded-md my-2 px-3 text-gray-400 bg-[#181819] py-4 outline-none text-sm'
          />
        </div>

        <div className='flex flex-col'>
          <label className='text-white mb-2'>Point</label>
          <input
            type='text'
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder='Assign point to task'
            className='border border-gray-800 rounded-md my-2 px-3 text-gray-400 bg-[#181819] py-4 outline-none text-sm'
          />
        </div>

        <div className='my-4 flex w-full justify-between'>
          <p className='mb-2 font-medium'>Is it important?</p>
          <div className='flex flex-col items-end'>
            <div
              onClick={toggle}
              className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-300 ${isOn ? 'bg-blue-500' : 'bg-gray-300'
                }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isOn ? 'translate-x-5' : ''
                  }`}
              />
            </div>
            <p className='mt-2 text-sm text-gray-400'>{isOn ? 'Toggle is ON' : 'Toggle is OFF'}</p>
          </div>
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className='text-white w-full py-3 justify-center rounded-md my-4 flex bg-blue-main'
        >
          {loading ? <ClipLoader size={20} color="#fff" />: 'Save'}
        </button>
      </div>
    </div>
  );
};

export default Edit_Task;
