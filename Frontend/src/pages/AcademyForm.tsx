import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { eclip } from '../assets'
import AcademyPersonalInfo from '../components/AcademyPersonalInfo'
import QuizModal from '../components/QuizModal'
import ResultModal from '../components/ResultModal'
import ClipLoader from "react-spinners/ClipLoader"
import toast, { Toaster } from "react-hot-toast"
import ModalWrapper from '../components/modalParent'
import { API_URL } from '../confiq'
import { quizData } from '../data/Quiz'

const AcademyForm: React.FC = () => {
  const [formData, setFormData] = useState<any>({})
  const [showQuiz, setShowQuiz] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [quizScore, setQuizScore] = useState<{
    score: number
    total: number
    correct: number
    totalQuestions: number
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Pick exactly 2 interests that exist in quizData
  const roles = (formData.web3Interests || [])
    .slice(0, 2)
    .filter((r: string) => quizData[r])

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email) {
      toast.error("Full Name and Email are required ❌")
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      toast.success("Form submitted ✅ Questions starting...")

      setTimeout(() => {
        setShowQuiz(true)
      }, 2000)
    }, 2000)
  }

  const handleQuizFinish = (
    userScore: number,
    totalScore: number,
    answers: string[],
    correctCount: number,
    totalQuestions: number
  ) => {
    setQuizScore({
      score: userScore,
      total: totalScore,
      correct: correctCount,
      totalQuestions,
    })

    setFormData((prev: any) => ({
      ...prev,
      quizAnswers: answers,
      quizScore: userScore,
      correctCount,
      totalQuestions,
    }))

    setShowQuiz(false)
    setShowResult(true)
  }

  const handleResultClose = async () => {
    if (!formData.fullName || !formData.email) {
      toast.error("Full Name and Email are required ❌")
      return
    }

    setShowResult(false)

    try {
      const res = await fetch(`${API_URL}/academy_form/academy/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message || "Failed to submit form ❌")
        return
      }

      toast.success("All data submitted successfully ✅")
      setFormData({})
      setQuizScore(null)

    } catch (err) {
      console.error(err)
      toast.error("Something went wrong ❌")
    }
  }

  return (
    <div className="bg-[#181819] min-h-[80vh] flex flex-col">
      <Navbar />

      <div>
        <img
          src={eclip}
          alt=""
          className="absolute left-1/2 lg:hidden to -translate-x-1/2 -transla 
               lg:-translate-y-2/3 xl:-translate-y-3/4
               w-full lg:w-1/3 xl:w-1/4 z-0"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          <h2 className="text-[42px] lg:text-7xl text-center font-bold text-white">
            Lets get in touch
          </h2>
          <p className="text-[14px] lg:text-2xl text-gray-400 text-center mt-4">
            We’d love to hear from you! Whether you have questions, need support, or want to learn more about us.
          </p>
        </div>
      </div>

      <AcademyPersonalInfo formData={formData} onChange={handleChange} />

      <button
        onClick={handleSubmit}
        disabled={loading || (formData.web3Interests?.length !== 2)}
        className={`rounded-2xl m-5 py-3 text-black font-semibold flex items-center justify-center
    ${loading || (formData.web3Interests?.length !== 2) ? "bg-gray-700 cursor-not-allowed" : "bg-white hover:bg-gray-200"}`}
      >
        {loading ? <ClipLoader size={20} color="#000" /> : "Send"}
      </button>

      {/* Optional visual hint */}
      {formData.web3Interests?.length !== 2 && (
        <p className="text-red-500 text-sm ml-5">
          Please select exactly 2 Web3 interests to proceed.
        </p>
      )}


      <Footer />

      {showQuiz && roles.length === 2 && (
        <ModalWrapper isOpen={showQuiz} onClose={() => setShowQuiz(false)}>
          <QuizModal
            roles={roles}
            onFinish={handleQuizFinish}
          />
        </ModalWrapper>
      )}

      {showResult && quizScore && (
        <ModalWrapper isOpen={showResult} onClose={() => setShowResult(false)}>
          <ResultModal
            score={quizScore.score}
            total={quizScore.total}
            correct={quizScore.correct}
            totalQuestions={quizScore.totalQuestions}
            onClose={handleResultClose}
          />
        </ModalWrapper>
      )}

      <Toaster position="top-center" />
    </div>
  )
}

export default AcademyForm
