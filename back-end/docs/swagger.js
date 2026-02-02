const swaggerJSDoc = require("swagger-jsdoc");

const entriesOptions = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Interestelar API",
            version: "1.0.0",
            description: "API para gerenciar arquivos interestelares",
            contact: {
                name: "Igor Rodrigues Machado",
                url: "https://github.com/igorrm19/Interestelar",
            },
        },

        servers: [
            {
                url: "http://localhost:5000",
                description: "Local server",
            },
        ],

        paths: {
            "/entries": {
                get: {
                    summary: "Retorna todos os arquivos",
                    responses: {
                        200: {
                            description: "Lista de arquivos",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/Entry",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },

                post: {
                    summary: "Cria um novo arquivo",
                    responses: {
                        201: {
                            description: "Arquivo criado com sucesso",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Entry",
                                    },
                                },
                            },
                        },
                    },
                },
            },

            "/entries/{id}": {
                get: {
                    summary: "Retorna um arquivo por id",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Arquivo encontrado",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Entry",
                                    },
                                },
                            },
                        },
                    },
                },

                put: {
                    summary: "Atualiza um arquivo por id",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Arquivo atualizado",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Entry",
                                    },
                                },
                            },
                        },
                    },
                },

                delete: {
                    summary: "Deleta um arquivo por id",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                            },
                        },
                    ],
                    responses: {
                        204: {
                            description: "Arquivo deletado com sucesso",
                        },
                    },
                },
            },
        },

        components: {
            schemas: {
                Entry: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        name: {
                            type: "string",
                            example: "Arquivo 1",
                        },
                        type: {
                            type: "string",
                            example: "Biological",
                        },
                        danger_level: {
                            type: "string",
                            example: "Alto",
                        },
                        description: {
                            type: "string",
                            example: "Descrição do arquivo",
                        },
                    },
                },
            },
        },
    },

    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(entriesOptions);

module.exports = swaggerSpec;
