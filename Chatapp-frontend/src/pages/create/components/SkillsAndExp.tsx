import React, { useState, type KeyboardEvent, type ChangeEvent } from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';
import FormButton from './FormButton';
import { All_Skills } from '../../../data/skillsData';
interface SkillsProps {
  formData: {
    skills: string[];
    experienceLevel: string;
    web3Area: string;
    web3AreaOther: string;
    tags: string[];
  };
  setFormData: React.Dispatch<React.SetStateAction<SkillsProps['formData']>>;
  errors: Partial<Record<keyof SkillsProps['formData'], string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof SkillsProps['formData'], string>>>>;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

const Skills: React.FC<SkillsProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
  goToNextStep,
  // goToPrevStep,
}) => {
  const [tags, setTags] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const update = (name: keyof SkillsProps['formData'], value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Tag input change
  const handletagsInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTags(value);

    if (value.trim()) {
      const filtered = All_Skills.filter(
        (skill) =>
          skill.toLowerCase().includes(value.toLowerCase().trim()) &&
          !formData.tags.includes(skill)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handletagsSkill = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
    setTags('');
    setSuggestions([]);
  };

  const handletagsKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tags.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tags.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tags.trim()],
        }));
      }
      setTags('');
    }
  };

  const removetags = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((s) => s !== tag),
    }));
  };

  // 1. Pure validation function
  const validateForm = () => {
    const newErrors: Partial<Record<keyof SkillsProps['formData'], string>> = {};

    if (formData.skills.length === 0) {
      newErrors.skills = 'Add at least one skill.';
    }

    if (!formData.experienceLevel.trim()) {
      newErrors.experienceLevel = 'Please select experience level.';
    }

    // Remove this block if tags are optional
    if (formData.tags.length === 0) {
      newErrors.tags = 'Please select tags for this Job.';
    }

    if (!formData.web3Area.trim()) {
      newErrors.web3Area = 'Please select a Web3 area.';
    }

    if (formData.web3Area === 'Others' && !formData.web3AreaOther.trim()) {
      newErrors.web3AreaOther = 'Please specify the Web3 area.';
    }

    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  // 2. Handle Next click
  const handleNext = () => {
    const { isValid, errors } = validateForm();
    if (!isValid) {
      setErrors(errors);
      return;
    }
    goToNextStep();
  };

  // 3. Button disable check
  const isFormComplete = validateForm().isValid;

  return (
    <div className="flex flex-col px-4 pb-24 text-white bg-neutral-900 w-full">
      <div className="flex flex-col gap-2 text-sm mb-7">
        <label htmlFor="skills">What skills are important for this role?</label>
        <input
          id="skills"
          type="text"
          placeholder="List the top skills for this role " value={formData.skills} // store as a string now, not an array
          onChange={(e) => update('skills', e.target.value)}
          className="p-3 px-4 rounded-2xl bg-zinc-900 text-gray-200 focus:outline-none placeholder:text-gray-500 ring-1 ring-gray-700 focus:ring-1 focus:ring-blue-main"
        />
        {errors.skills && (
          <p className="text-red-400 flex items-center gap-1 text-sm mt-1">
            <RiErrorWarningFill /> {errors.skills}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 text-sm mb-7">
        <label htmlFor="experienceLevel">What experience level are you looking for?</label>
        <select
          id="experienceLevel"
          value={formData.experienceLevel}
          onChange={(e) => update('experienceLevel', e.target.value)}
          className="text-gray-200 bg-zinc-900 p-3 px-4 rounded-xl ring-gray-700 ring-1 focus:outline-none focus:ring-1 focus:ring-blue-main"
        >
          <option value="" disabled hidden>Select</option>
          <option value="None">None</option>
          <option value="1year">1 year</option>
          <option value="2years">2 years</option>
          <option value="3years">3 years</option>
          <option value="4years">4 years</option>
          <option value="5years">5 years</option>
          <option value="6-10years">6-10 years</option>
        </select>
        {errors.experienceLevel && (
          <p className="text-red-400 flex items-center gap-1 text-sm mt-1">
            <RiErrorWarningFill /> {errors.experienceLevel}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 text-sm mb-7">
        <label htmlFor="web3Area">What area of Web3 does this role focus on?</label>
        <select
          id="web3Area"
          value={formData.web3Area}
          onChange={(e) => update('web3Area', e.target.value)}
          className="text-gray-200 bg-zinc-900 p-3 px-4 rounded-xl ring-gray-700 ring-1 focus:outline-none focus:ring-1 focus:ring-blue-main"
        >
          <option value="" disabled hidden>Select</option>
          <option value="DAOs">DAOs</option>
          <option value="Airdrops">Airdrops</option>
          <option value="Layer1">Layer1</option>
          <option value="Layer2">Layer2</option>
          <option value="Blockchain">Blockchain</option>
          <option value="Game">Game</option>
          <option className='text-secondary-main' value="Others">Others (Kindly specify)</option>
        </select>
        {errors.web3Area && (
          <p className="text-red-400 flex items-center gap-1 text-sm mt-1">
            <RiErrorWarningFill /> {errors.web3Area}
          </p>
        )}

        {formData.web3Area === 'Others' && (
          <div className="mt-1">
            <label htmlFor="web3AreaOther" className="sr-only text-white">Specify Other Web3 Area</label>
            <input
              id="web3AreaOther"
              type="text"
              placeholder="e.g. DeFi, NFTs, etc."
              value={formData.web3AreaOther}
              onChange={(e) => update('web3AreaOther', e.target.value)}
              className="text-gray-200 bg-zinc-900 p-3 px-4 rounded-2xl ring-gray-700 ring-1 focus:outline-none focus:ring-1 focus:ring-blue-main w-full"
            />
            {errors.web3AreaOther && (
              <p className="text-red-400 flex items-center gap-1 text-sm mt-1">
                <RiErrorWarningFill /> {errors.web3AreaOther}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 text-sm mb-7">

        <div className="flex flex-col gap-2 text-sm mb-7">
          <label htmlFor="tags">Tags <span className='text-gray-400'> </span></label>
          <div className="flex flex-col relative">
            <div className="flex flex-wrap items-center p-3 px-4 rounded-2xl bg-zinc-900 focus-within:ring-1 focus-within:ring-blue-main">
              {formData.tags.map((tags, idx) => (
                <span
                  key={idx}
                  className="text-secondary-main bg-zinc-800 text-xs px-3 py-1 rounded-xl flex items-center gap-1 mr-2 my-1 whitespace-nowrap"
                >
                  {tags}
                  <IoClose
                    className="cursor-pointer"
                    onClick={() => removetags(tags)}
                  />
                </span>
              ))}
              <input
                id="tags"
                type="text"
                placeholder={formData.tags.length === 0 ? "e.g ui/ux designer, Solidity Developer" : ""}
                value={tags}
                onChange={handletagsInputChange}
                onKeyDown={handletagsKeyPress}
                className="flex-grow bg-zinc-900 text-gray-200 focus:outline-none placeholder:text-gray-500 min-w-[100px]"
              />
            </div>
            {/* Suggestions List */}
            {suggestions.length > 0 && (
              <div className="flex flex-col z-10 bg-zinc-900 border border-zinc-700 rounded-xl mt-2 p-3 min-h-48 overflow-y-auto">
                <p>Suggestions</p>
                <div className='flex flex-wrap w-full mt-2 space-x-2'>
                  {suggestions.map((tags, idx) => (
                    <span
                      key={idx}
                      onClick={() => handletagsSkill(tags)}
                      className=" bg-zinc-700 cursor-pointer text-gray-300 text-md px-3 py-2 rounded-xl my-1 whitespace-nowrap transition-colors duration-200 ease-in-out hover:bg-blue-main"
                    >
                      {tags}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          {errors.tags && (
            <p className="text-red-400 flex items-center gap-1 text-sm mt-1">
              <RiErrorWarningFill /> {errors.tags}
            </p>
          )}
        </div>


      </div>
      <FormButton onClick={handleNext} isFormComplete={isFormComplete} text="Continue" />
    </div>
  );
};

export default Skills;
