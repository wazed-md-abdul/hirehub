'use server'
const baseUrl = process.env.NEXT_SERVER_PUBLIC_URL || "http://localhost:5000";

export const createApplication = async (applicationData) => {
    const res = await fetch(`${baseUrl}/api/applications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationData)
    });
    return res.json();
};

export const getApplications = async (userId, jobId) => {
    const params = new URLSearchParams();
    if (userId) params.append("userId", userId);
    if (jobId) params.append("jobId", jobId);

    const queryString = params.toString();
    const url = queryString ? `${baseUrl}/api/applications?${queryString}` : `${baseUrl}/api/applications`;

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 0 }
    });
    return res.json();
};
