const { z } = require("zod");

const entrySchema = z.object({
    name: z.string()
        .min(1, "Nome é obrigatório")
        .max(255, "Nome muito longo"),

    type: z.string()
        .max(100)
        .optional(),

    danger_level: z.string()
        .max(50)
        .optional(),

    description: z.string()
        .max(255)
        .optional()
});

module.exports = {
    entrySchema
};