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

export const getCompanies = async () => {
    const res = await fetch(`${baseUrl}/api/companies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 0 }
    });
    return res.json();
};
