import clientService from "../services/clientService.js";

export const getClients = async (req, res) => {
    try {
        const clients = await clientService.getAllClients();

        res.status(200).json(clients);
    } catch (error) {
        console.error('Error al obtener clientes', error);

        res.status(500).json({
            message: 'Error al obtener clientes',
        });
    }
};

export const createClient = async (req, res) => {
    try {
        const { name, phone } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                message: 'Nombre y télefono son obligatorios',
            });
        }

        const client = await clientService.createClient({
            name,
            phone,
        });

        res.status(201).json({
            message: 'Cliente creado correctamente',
            client,
        });

    } catch (error) {
        console.error('Error al crear cliente:', error);

        res.status(400).json({
            message: error.message,
        });
    }
};

export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        const client = await clientService.deleteClient(id);

        if (!client) {
            return res.status(404).json({
                message: 'Cliente no encontrado',
            });
        }

        res.status(200).json({
            message: 'Cliente eliminado'
        });

    } catch (error) {
        console.error('Error al eliminar cliente', error);

        res.status(400).json({
            message: 'ID del cliente inválido',
        });
    };
}