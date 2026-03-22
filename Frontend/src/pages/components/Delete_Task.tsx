import React, { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ClipLoader } from 'react-spinners';
import { API_URL } from '../../confiq';

interface PopupProps {
  item: any;
  onClose: () => void;
  refresh: () => void;
}

const Delete_Task: React.FC<PopupProps> = ({ onClose, item, refresh }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const projectId = localStorage.getItem('project_id');

      const response = await fetch(`${API_URL}/project_tasks/delete_task/${projectId}/${item._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        refresh(); // ✅ Refresh task list
        onClose(); // ✅ Close modal
      } else {
        console.error('Failed to delete task');
      }
    } catch (err) {
      console.error('Error deleting task:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-6 m-2 text-center shadow-2xl bg-[#151718]'>
      <RiDeleteBin6Line className='text-red-700 w-full text-2xl mb-6' />

      <div className='my-4'>
        <p className='text-sm'>Are you sure you want to delete this task?</p>
      </div>

      <div className='text-white border mt-4 py-3 border-gray-700 px-2 rounded-md flex text-sm justify-between'>
        <p className='truncate max-w-[150px]'>{item.description}</p>
        <p>{item?.points} pts</p>
      </div>

      <div className='flex w-full gap-4 my-4 mt-10'>
        <button onClick={onClose} className='border w-full py-3 text-sm rounded-md border-gray-700'>
          Cancel
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className='rounded-md w-full py-3 text-sm bg-red-700 flex items-center justify-center gap-2'
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default Delete_Task;
