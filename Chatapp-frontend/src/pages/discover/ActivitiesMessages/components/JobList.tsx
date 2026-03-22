import React, { useEffect, useState } from 'react';
import JobPostingItem from './JobPostingItem';
import { toast } from 'react-hot-toast';
import { API_URL } from '../../../../confiq';
import CLiploader from '../../../../components/CLiploader';

interface Job {
  _id: string;
  title: string;
  description: string;
  // Add any other fields from your Job model
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('User not authenticated');
      return;
    }

    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_URL}/user_activity/get_user_job_posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();
        console.log(data);
        
        if (res.ok && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        } else {
          toast.error(data.message || 'Failed to fetch jobs');
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        toast.error('Server error');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
     <CLiploader />
    );
  }

  if (!jobs.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        No job postings yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <JobPostingItem key={job._id} job={job as any} />
      ))}
    </div>
  );
};

export default JobList;
