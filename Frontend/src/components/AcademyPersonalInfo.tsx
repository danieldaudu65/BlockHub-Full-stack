import React, { useState } from "react";

interface Props {
  formData: any;
  onChange: (field: string, value: any) => void;

}

const AcademyPersonalInfo: React.FC<Props> = ({ formData, onChange }) => {
  const [web2Other, setWeb2Other] = useState(false);
  const [web3Other, setWeb3Other] = useState(false);

  return (
    <div className="bg-[#181819] academy shadow-[0px_0px_60px_#340182] mt-10 min-h-screen text-gray-100 p-6 m-3 rounded-xl flex justify-center">
      <form className="w-full max-w-2xl space-y-6">

        {/* Personal Info */}
        <section className="bg-[#181819] rounded-xl p- space-y-4 shadow">
          <h2 className="text-lg text-[#AAAAAA] font-semibold">Personal Info</h2>

          <label className="block text-sm text-[#AAAAAA]">Full Name</label>
          <input
            type="text"
            value={formData.fullName || ""}
            onChange={(e) => onChange("fullName", e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-700 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <label className="block text-sm text-[#AAAAAA]">Email Address</label>
          <input
            type="email"
            value={formData.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-700 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </section>

        {/* Web2 Background */}
        <section className="bg-[#181819] rounded-xl p- mt-12 space-y-4 shadow">
          <h2 className="text-lg font-semibold">Web2 Background</h2>
          <p className="text-sm text-gray-300">What Web2 skills do you currently have?</p>
          <div className="space-y-2">
            {[
              "Frontend Development (React, Vue, etc.)",
              "Backend Development (Node.js, Django, etc.)",
              "Mobile App Development",
              "UI/UX Design",
              "Graphics Design",
              "Illustration",
              "Database Management",
              "Cloud/DevOps",
              "Content Writing",
              "Digital Marketing",
              "Community Management",
              "Nil ( Nothing )",
              "Other",
            ].map((skill) => (
              <label key={skill} className="flex items-center space-x-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.web2Skills?.includes(skill) || false}
                  onChange={(e) => {
                    if (skill === "Other") setWeb2Other(e.target.checked);

                    const newSkills = formData.web2Skills || [];
                    if (e.target.checked) {
                      onChange("web2Skills", [...newSkills, skill]);
                    } else {
                      onChange("web2Skills", newSkills.filter((s: string) => s !== skill));
                    }
                  }}
                  className="
                    w-5 h-5 rounded-md border border-gray-500 
                    checked:bg-purple-500 checked:border-purple-500 
                    checked:before:content-['✔'] checked:before:text-black checked:before:text-[12px]
                    checked:before:block checked:before:text-center checked:before:leading-5
                    appearance-none
                  "
                />
                <span className="text-[#AAAAAA]">{skill}</span>
              </label>
            ))}

            {web2Other && (
              <input
                type="text"
                value={formData.web2Other || ""}
                onChange={(e) => onChange("web2Other", e.target.value)}
                placeholder="Please specify..."
                className="w-full p-3 rounded-lg border border-gray-700 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
              />
            )}
          </div>

          <p className="text-sm text-[#AAAAAA] mt-4">Share a link to one Web2 project</p>
          <input
            type="text"
            value={formData.web2Project || ""}
            onChange={(e) => onChange("web2Project", e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-700 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <div>
            <label className="block mb-1 text-sm">Rate your Web2 skills (1–10)</label>
            <input
              type="number"
              min={1}
              max={10}
              value={formData.web2Rating || ""}
              onChange={(e) => onChange("web2Rating", e.target.value)}
              className="w-20 p-2 rounded border border-gray-700 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </section>

        {/* Web3 Interests */}
        {/* Web3 Interests */}
        <section className="bg-[#181819] rounded-xl p- space-y-4 shadow">
          <h2 className="text-lg font-semibold">Web3 Interests</h2>
          <p className="text-sm text-gray-300">Pick exactly 2 areas of Web3 you are most curious about:</p>

          <div className="space-y-2">
            {[
              "On-chain Analysis",
              "Smart Contract Development",
              "UI/UX for Web3",
              "Technical Writing",
              "Content Creation",
              "Tokenomics & Crypto Economics",
              "Community Building",
              "Blockchain Security",
              "NFTs & Gaming",
              "DeFi Protocols",
              "Business Development",
            ].map((interest) => {
              const selected = formData.web3Interests || [];
              const isChecked = selected.includes(interest);
              const isDisabled = !isChecked && selected.length >= 2;
              return (
                <label
                  key={interest}
                  className={`flex items-center space-x-4 ${isDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={(e) => {
                      let newInterests = [...selected];

                      if (e.target.checked) {
                        newInterests.push(interest);
                      } else {
                        newInterests = newInterests.filter((i) => i !== interest);
                      }

                      onChange("web3Interests", newInterests);

                      if (interest === "Other") setWeb3Other(e.target.checked);
                    }}
                    className="
              w-5 h-5 rounded-md border border-gray-500 
              checked:bg-purple-500 checked:border-purple-500 
              checked:before:content-['✔'] checked:before:text-black checked:before:text-[12px]
              checked:before:block checked:before:text-center checked:before:leading-5
              appearance-none
            "
                  />
                  <span className="text-[#AAAAAA]">{interest}</span>
                </label>
              );
            })}

            {web3Other && (
              <input
                type="text"
                value={formData.web3Other || ""}
                onChange={(e) => onChange("web3Other", e.target.value)}
                placeholder="Please specify..."
                className="w-full p-3 rounded-lg border border-gray-700 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
              />
            )}
          </div>
        </section>


        {/* Learning Fit */}
        <section className="bg-[#181819] rounded-xl p- space-y-4 shadow">
          <h2 className="text-lg font-semibold">Learning Fit</h2>
          <div className="border p-4 rounded-xl bg-[#181819] space-y-2 border-gray-700">

            <p className="text-sm text-gray-300">How fast do you learn new concepts?</p>
            <div className="space-y-2 ">
              {[
                "Very fast",
                "Moderate pace",
                "I prefer hands-on practice",
                "I take time but stay consistent",
              ].map((option) => (
                <label key={option} className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="learningSpeed"
                    checked={formData.learningSpeed === option}
                    onChange={() => onChange("learningSpeed", option)}
                    className="
                    w-5 h-5 rounded-full border border-gray-500
                    appearance-none
                    checked:bg-purple-500 checked:border-purple-500
                    "
                  />
                  <span className="text-[#AAAAAA]">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm">How many hours per week can you dedicate?</label>
            <input
              type="number"
              value={formData.hoursPerWeek || ""}
              onChange={(e) => onChange("hoursPerWeek", e.target.value)}
              className="w-24 p-2 rounded border-b border-gray-700 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <span className="ml-2 text-[#AAAAAA]">Hrs</span>
          </div>
          <div>
            <p className="block mb-2 text-sm">Do you prefer learning?</p>
            <div className="space-y-2">
              {[
                { label: "Individually", value: "individual" },
                { label: "Group/Team", value: "team" },
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="learningPreference"
                    checked={formData.learningPreference === option.value}
                    onChange={() => onChange("learningPreference", option.value)}
                    className="
            w-5 h-5 rounded-full border border-gray-500
            appearance-none
            checked:bg-purple-500 checked:border-purple-500
          "
                  />
                  <span className="text-[#AAAAAA]">{option.label}</span>
                </label>
              ))}
            </div>
          </div>


          <p className="text-sm text-[#AAAAAA] mt-4">
            What’s your long-term Web3 goal? (Example: get a job, build a project, launch a startup)
          </p>
          <textarea
            value={formData.web3Goal || ""}
            onChange={(e) => onChange("web3Goal", e.target.value)}
            className="w-full p-3 rounded border border-gray-700 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
            rows={3}
          />
        </section>
      </form>
    </div>
  );
};

export default AcademyPersonalInfo;
