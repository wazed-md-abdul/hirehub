'use server'
const baseUrl = process.env.NEXT_SERVER_PUBLIC_URL || "http://localhost:5000";

export const getJobs = async (companyId, status, isRemote, search) => {
    const params = new URLSearchParams();
    if (companyId) params.append("companyId", companyId);
    if (status) params.append("status", status);
    if (isRemote !== undefined && isRemote !== null) params.append("isRemote", isRemote);
    if (search) params.append("search", search);

    const queryString = params.toString();
    const url = queryString ? `${baseUrl}/api/jobs?${queryString}` : `${baseUrl}/api/jobs`;

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res.json();
}

export const getJobById = async (id) => {
    const res = await fetch(`${baseUrl}/api/jobs/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 0 }
    });
    if (!res.ok) return null;
    return res.json();
}