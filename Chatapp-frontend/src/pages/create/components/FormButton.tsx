import React from 'react'

type FormButtonProps = {
    onClick: () => void;
    isFormComplete: boolean;
    text: string;
}

const FormButton: React.FC<FormButtonProps> = ({ onClick, isFormComplete, text }) => {
  return (
    <div className='fixed bottom-0 left-0 right-0 p-4 bg-faded-gray z-5'>
      <button
        type="button"
        onClick={onClick}
        className={`w-full p-3 text-md rounded-xl
          transition-colors ${isFormComplete ? "bg-blue-main text-white hover:bg-purple-600 cursor-pointer" 
          : "bg-zinc-800 text-gray-400 hover:bg-zinc-700 cursor-not-allowed"}`}
      >
        {text}
      </button>
    </div>
  )
}

export default FormButton