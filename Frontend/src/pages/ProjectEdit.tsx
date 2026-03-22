import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { API_URL } from "../confiq"

const ProjectEdit: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [projectData, setProjectData] = useState({
        projectName: localStorage.getItem("project_name") || "",
        twitterHandle: localStorage.getItem("project_username") || "",
        description: localStorage.getItem("project_desc") || "",
        profileImage: localStorage.getItem("project_image") || "",
        compensation: "",
    })



    const [loading, setLoading] = useState(false)



    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const token = queryParams.get("token")
        const name = queryParams.get("username")   // ✅ updated to match backend
        const username = queryParams.get("handle") // ✅ still correct
        const image = queryParams.get("img")
        const loggin = queryParams.get("firstLogin")
        const desc = queryParams.get("desc")
        const id = queryParams.get("id")

        if (desc) localStorage.setItem("project_desc", desc)
        if (loggin) localStorage.setItem("logged_in", loggin)
        if (token) localStorage.setItem("project_token", token)
        if (name) localStorage.setItem("project_name", name)
        if (username) localStorage.setItem("project_username", username)
        if (image) localStorage.setItem("project_image", image)
        if (id) localStorage.setItem("project_id", id)

        if (location.search) {
            navigate("/grindfi/edit", { replace: true })
        }
    }, [location, navigate])

    const handleChange = (field: string, value: string) => {
        setProjectData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        const id = localStorage.getItem("project_id")
        const token = localStorage.getItem("project_token")

        if (!id || !token) {
            toast.error("Missing project ID or token ❌")
            return
        }

        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/project_profile/projects/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(projectData),
            })

            const data = await res.json()
            if (res.ok) {
                toast.success("Project updated successfully ✅")
                navigate('/grindfi/home')
            } else {
                toast.error(data.message || "Failed to update project ❌")
            }
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong ❌")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-neutral-900 ">
            <Navbar />
            <div className="flex border border-gray-700 flex-col items-center py-4">
                <h1 className="text-3xl font-bold text-white mb-6">Edit Project</h1>

                <div className="bg-neutral-900 rounded-xl p-6 w-full max-w-2xl flex flex-col gap-4">
                    <label className="text-gray-300">Project Name</label>
                    <input
                        type="text"
                        value={projectData.projectName}
                        onChange={e => handleChange("projectName", e.target.value)}
                        className="p-2  bg-transparent border border-gray-700 outline-none text-sm  py-3 rounded-md w-full  text-white"
                    />

                    <label className="text-gray-300">Twitter Handle</label>
                    <input
                        type="text"
                        value={projectData.twitterHandle}
                        onChange={e => handleChange("twitterHandle", e.target.value)}
                        className="p-2  bg-transparent border border-gray-700 outline-none text-sm  py-3 rounded-md w-full  text-white"
                    />

                    <label className="text-gray-300">Description</label>
                    <textarea
                        value={projectData.description}
                        onChange={e => handleChange("description", e.target.value)}
                        className="p-2  bg-transparent border border-gray-700 outline-none text-sm  py-3 rounded-md w-full  text-white"
                        rows={4}
                    />

                    <label className="text-gray-300">Profile Image URL</label>
                    <input
                        type="text"
                        value={projectData.profileImage}
                        onChange={e => handleChange("profileImage", e.target.value)}
                        className="p-2  bg-transparent border border-gray-700 outline-none text-sm  py-3 rounded-md w-full  text-white"
                    />

                    <label className="text-gray-300">Ambassador Compensation</label>
                    <input
                        type="text"
                        value={projectData.compensation}
                        placeholder="Exa... 50$/Wk - Top 3"
                        onChange={e => handleChange("compensation", e.target.value)}
                        className="p-2  bg-transparent border placeholder:text-sm placeholder:text-gray-600 border-gray-700 outline-none text-sm  py-3 rounded-md w-full  text-white"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`mt-4 py-2 rounded-xl font-semibold text-black ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-white hover:bg-gray-200"
                            }`}
                    >
                        {loading ? "Updating..." : "Update Project"}
                    </button>
                </div>

                <Toaster position="top-center" />
            </div>
            <Footer />
        </div >
    )
}

export default ProjectEdit
