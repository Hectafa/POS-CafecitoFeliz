import Client from "../models/Client.js";

const getAllClients = async () => {
    return await Client.find().sort({ createaAt: -1 });
};

const createClient = async (clientData) => {
    const client = new Client(clientData);

    return await client.save();
};

const deleteClient = async (id) => {
    return await Client.findByIdAndDelete(id);
};

export default {
    getAllClients,
    createClient,
    deleteClient,
};
