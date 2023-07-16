export type Army = {
	name: string;
	faction: string;
	notes: string;
	maxPoints: number;
	units: Unit[];
};

export type Unit = {
	type: string;
	name: string;
	size: number;
	notes: string;
	points: number;
};
