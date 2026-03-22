import React, { useState, useRef } from "react"
import toast, { Toaster } from "react-hot-toast"
import Navbar from "../components/Navbar"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../confiq"

const ProjectSignup: React.FC = () => {
    const [formData, setFormData] = useState({
        projectName: "",
        twitterHandle: "",
        description: "",
        compensation: "",
    })
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setProfileImageFile(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleSubmit = async () => {
        if (!formData.projectName || !formData.description) {
            toast.error("Project Name and Description are required ❌")
            return
        }

        setLoading(true)
        try {
            let imageUrl = ""

            if (profileImageFile) {
                const formDataUpload = new FormData()
                formDataUpload.append("profileImage", profileImageFile)

                const uploadRes = await fetch(`${API_URL}/project_auth/upload`, {
                    method: "POST",
                    body: formDataUpload,
                })

                const uploadData = await uploadRes.json()
                if (uploadRes.ok) {
                    imageUrl = uploadData.imageUrl
                } else {
                    toast.error(uploadData.message || "Image upload failed ❌")
                    setLoading(false)
                    return
                }
            }

            const res = await fetch(`${API_URL}/project_auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, profileImage: imageUrl }),
            })

            const data = await res.json()
            if (res.ok) {
                toast.success("Project signed up successfully ✅")

                // Store in localStorage like query params flow
                if (data.token) localStorage.setItem("project_token", data.token)
                if (data.name) localStorage.setItem("project_name", data.name)
                if (data.handle) localStorage.setItem("project_username", data.handle)
                if (data.img) localStorage.setItem("project_image", data.img)
                if (data.id) localStorage.setItem("project_id", data.id)
                localStorage.setItem("logged_in", "true")

                setFormData({
                    projectName: "",
                    twitterHandle: "",
                    description: "",
                    compensation: "",
                })
                setProfileImageFile(null)
                setPreviewUrl("")

                navigate("/grindfi/home", { replace: true })
            } else {
                toast.error(data.message || "Failed to sign up ❌")
            }
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong ❌")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-neutral-900">
            <Navbar />
            <div className="flex flex-col items-center p-6">
                <h1 className="text-3xl font-bold text-white mb-6">Project Signup</h1>

                <div className="border border-gray-700 rounded-xl p-6 w-full max-w-2xl flex flex-col gap-4">
                    <label className="text-gray-300" htmlFor="projectname">Project Name *</label>
                    <input 
                        type="text"
                        id="projectname"
                        value={formData.projectName}
                        onChange={e => handleChange("projectName", e.target.value)}
                        className="p-2 py-3 px-2 placeholder:text-gray-600 text-sm placeholder:text-sm outline-none bg-transparent rounded-md w-full border border-gray-700  text-white"
                    />

                    <label className="text-gray-300" htmlFor="twitterhandle">Twitter Handle (Optional)</label>
                    <input
                        type="text"
                        id="twitterhandle"
                        value={formData.twitterHandle}
                        onChange={e => handleChange("twitterHandle", e.target.value)}
                        className="p-2 py-3 px-2 placeholder:text-gray-600 text-sm placeholder:text-sm outline-none bg-transparent rounded-md w-full border border-gray-700  text-white"
                    />

                    <label className="text-gray-300" htmlFor="description">Description *</label>
                    <textarea
                    id="description"
                        value={formData.description}
                        onChange={e => handleChange("description", e.target.value)}
                        className="p-2 py-3 px-2 placeholder:text-gray-600 text-sm placeholder:text-sm outline-none bg-transparent rounded-md w-full border border-gray-700  text-white"
                        rows={4}
                    />

                    <label className="text-gray-300" htmlFor="profile">Profile Image</label>
                    <div className="flex justify-center">
                        <div
                            onClick={handleImageClick}
                            className="w-28 h-28 flex items-center justify-center rounded-full border-2 border-dashed border-gray-600 cursor-pointer hover:border-gray-400 transition"
                        >
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                <Plus className="text-gray-400 w-10 h-10" />
                            )}
                        </div>
                        <input
                        id="profile"
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    <label className="text-gray-300">Ambassador Compensation</label>
                    <input
                        type="text"
                        value={formData.compensation}
                        placeholder=" Exa... 50$/Wk - Top 3"
                        onChange={e => handleChange("compensation", e.target.value)}
                        className="p-2 py-3 px-2 placeholder:text-gray-600 text-sm placeholder:text-sm outline-none bg-transparent rounded-md w-full border border-gray-700  text-white"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`mt-4 py-2 rounded-xl font-semibold text-black ${loading
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-white hover:bg-gray-200"
                            }`}
                    >
                        {loading ? "Signing Up..." : "Sign Up Project"}
                    </button>
                </div>

                <Toaster position="top-center" />
            </div>
        </div>
    )
}

export default ProjectSignup
