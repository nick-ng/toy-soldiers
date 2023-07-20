import z from 'zod';

export const UnitSchema = z.object({
	type: z.string(),
	name: z.string(),
	size: z.number(),
	notes: z.string(),
	points: z.number()
});

export const ArmySchema = z.object({
	name: z.string(),
	faction: z.string(),
	notes: z.string(),
	maxPoints: z.number(),
	units: z.array(UnitSchema)
});

export type Unit = z.infer<typeof UnitSchema>;
export type Army = z.infer<typeof ArmySchema>;
