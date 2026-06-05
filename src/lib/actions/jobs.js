'use server'
const baseUrl = process.env.NEXT_SERVER_PUBLIC_URL || "http://localhost:5000";

export const createJob = async (newJobData) => {
    const res = await fetch(`${baseUrl}/api/addjob`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJobData)
    
    });
    return res.json();
}

export const deleteJob = async (id) => {
    const res = await fetch(`${baseUrl}/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res.json();
}

export const updateJob = async (id, updatedJobData) => {
    const res = await fetch(`${baseUrl}/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedJobData)
    });
    return res.json();
}