import React, { useState } from "react"
import { comT, gradup } from "../assets"
import ClipLoader from "react-spinners/ClipLoader"

interface ResultModalProps {
  score: number
  total: number
  correct: number
  totalQuestions: number
  onClose: () => Promise<void> // make async since it hits API
}

const ResultModal: React.FC<ResultModalProps> = ({
  score,
  correct,
  totalQuestions,
  onClose,
}) => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (loading) return
    setLoading(true)

    try {
      await onClose() // wait for API submission from parent
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#0E0E0E] relative text-white rounded-2xl shadow-lg w-[90%] m-auto text-center">
      <img src={gradup} className="absolute" alt="" />
      <div className="py-6 flex justify-center">
        <img src={comT} className="w-1/4" alt="" />
      </div>

      <h2 className="text-xl font-bold mb-4">Test Completed 🎉</h2>

      <div className="m-4">
        <div className="p-4 rounded-2xl bg-[#151515] space-y-3">
          <div className="flex justify-between">
            <p>Score</p>
            <p className="text-purple-400 font-bold">{score}</p>
          </div>

          <div className="flex justify-between">
            <p>Correct Submission</p>
            <p className="text-purple-400 font-bold">
              {correct}/{totalQuestions}
            </p>
          </div>
        </div>
      </div>

      <div className="p-3">
        <button
          onClick={handleClick}
          disabled={loading}
          className={`bg-white w-full py-3 font-semibold text-black rounded-xl hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {loading ? <ClipLoader size={20} color="#000" /> : "Done"}
        </button>
      </div>
    </div>
  )
}

export default ResultModal
