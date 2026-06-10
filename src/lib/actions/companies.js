'use server'
const baseUrl = process.env.NEXT_SERVER_PUBLIC_URL || "http://localhost:5000";

export const createCompany = async (newCompanyData) => {
    const res = await fetch(`${baseUrl}/api/addcompany`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCompanyData)
    });
    return res.json();
};

export const getCompanies = async (userId) => {
    const res = await fetch(`${baseUrl}/api/companies/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 0 }
    });
    return res.json();
};

export const updateCompany = async (id, updatedCompanyData) => {
    const res = await fetch(`${baseUrl}/api/companies/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCompanyData)
    });
    return res.json();
};

export const deleteCompany = async (id) => {
    const res = await fetch(`${baseUrl}/api/companies/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res.json();
};

export const getAllCompanies = async () => {
    const res = await fetch(`${baseUrl}/api/companies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 0 }
    });
    return res.json();
};

export const getCompanyById = async (id) => {
    const res = await fetch(`${baseUrl}/api/company/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 0 }
    });
    if (!res.ok) return null;
    return res.json();
};
