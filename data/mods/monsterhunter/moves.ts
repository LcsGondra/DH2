export const Moves: {[moveid: string]: MoveData} = {
	/*
	CUSTOM MOVES
	*/
	magnalance: {
		num: 2000,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Magna Lance",
		shortDesc: "Usually goes first. Fails if target is not attacking.",
		pp: 5,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				return false;
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	eggbarrage: {
		num: 2001,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		name: "Egg Barrage",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},
	glidebomb: {
		num: 2002,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Glide Bomb",
		shortDesc: "Hits 2-5 times in one turn.",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Fire",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Beautiful",
	},
	dragonator: {
		num: 2003,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Dragonator",
		shortDesc: "Cannot be used on consecutive turns. Super-Effective on Dragon-Types. 10% Flinch.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, cantusetwice: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dragon') return 1;
		},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	devour: {
		num: 2004,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Devour",
		shortDesc: "Recovers HP and eats held berry. Fails if user isn't holding a berry.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		heal: [1, 2],
		onTry(source) {
			return source.getItem().isBerry;
		},
		onHit(pokemon) {
			pokemon.eatItem(true);
		},
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Beautiful",
	},
	wretchedwater: {
		num: 2005,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Wretched Water",
		shortDesc: "30% chance to paralyze the target.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Cool",
	},
	cutwingbarrage: {
		num: 2006,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		name: "Cutwing Barrage",
		shortDesc: "May cause flinching.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'bleeding',
		},
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	thunderrush: {
		num: 2007,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Thunder Rush",
		shortDesc: "Always crits.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	frenzyslam: {
		num: 2008,
		accuracy: 95,
		basePower: 80,
		category: "Special",
		name: "Frenzy Slam",
		shortDesc: "Summons Reflect.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			sideCondition: 'reflect',
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	bewitchedbubble: {
		num: 2009,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Bewitched Bubble",
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	creepynoise: {
		num: 2010,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Creepy Noise",
		shortDesc: "100% chance to paralyze the foe.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		secondary: {
			chance: 100,
			status: 'par',
		},
		target: "normal",
		type: "Bug",
		contestType: "Clever",
	},
	arcticshriek: {
		num: 2011,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		name: "Arctic Shriek",
		shortDesc: "Eliminates all stat changes.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		onHit() {
			this.add('-clearallboost');
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts();
			}
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Clever",
	},
	cloakingglow: {
		num: 2012,
		accuracy: 95,
		basePower: 80,
		category: "Special",
		name: "Cloaking Glow",
		shortDesc: "Summons Light Screen.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			sideCondition: 'lightscreen',
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	mossbomb: {
		num: 2013,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		name: "Moss Bomb",
		shortDesc: "Summons Leech Seed.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, source) {
			if (target.hasType('Grass')) return null;
			target.addVolatile('leechseed', source);
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
	magmasurge: {
		num: 2014,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Magma Surge",
		shortDesc: "100% chance to burn the foe.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, defrost: 1},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	apexburst: {
		num: 2015,
		accuracy: 85,
		basePower: 120,
		category: "Special",
		name: "Apex Burst",
		shortDesc: "Cures the user's party of all status conditions.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			onHit(pokemon, source, move) {
				this.add('-activate', source, 'move: Aromatherapy');
				for (const ally of source.side.pokemon) {
					if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
					}
					ally.cureStatus();
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Clever",
	},
	frenzypulse: {
		num: 2016,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Frenzy Pulse",
		shortDesc: "Lowers SpA by 1; Raises Spe by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		selfBoost: {
			boosts: {
				spa: -1,
				spe: +1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
	},
	psychocrush: {
		num: 2017,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Psycho Crush",
		shortDesc: "Summons Gravity.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			pseudoWeather: 'gravity',
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	biocharge: {
		num: 2018,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Biocharge",
		shortDesc: "Raises the user's Sp. Atk by 3. Lowest priority.",
		pp: 5,
		priority: -6,
		flags: {snatch: 1, metronome: 1},
		boosts: {
			spa: 3,
		},
		secondary: null,
		target: "self",
		type: "Bug",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	heatbeam: {
		num: 2019,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		overrideDefensiveStat: 'spd',
		name: "Heat Beam",
		shortDesc: "Damages target based on Sp. Def, not Defense.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	boltbreath: {
		num: 2020,
		accuracy: 100,
		basePower: 70,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Bolt Breath damage boost');
				return move.basePower * 2;
			}
			this.debug('Bolt Breath NOT boosted');
			return move.basePower;
		},
		category: "Special",
		name: "Bolt Breath",
		shortDesc: "Power doubles if the user moves before the target.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Electric",
	},
	cyclonerend: {
		num: 2021,
		accuracy: 100,
		basePower: 70,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Cyclone Rend damage boost');
				return move.basePower * 2;
			}
			this.debug('Cyclone Rend NOT boosted');
			return move.basePower;
		},
		category: "Special",
		name: "Cyclone Rend",
		shortDesc: "Power doubles if the user moves before the target.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	coldsnap: {
		num: 2022,
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "Cold Snap",
		shortDesc: "Freezes the target.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		status: 'frz',
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {boost: {spa: 1}},
		contestType: "Beautiful",
	},
	blazeball: {
		num: 2023,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Blaze Ball",
		shortDesc: "No additional effect.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	crimsondawn: {
		num: 2024,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Crimson Dawn",
		shortDesc: "C-Fatalis: Cannot be selected the turn after it's used.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, cantusetwice: 1, contact: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		onTry(source) {
			if (source.species.name === 'Crimson-Fatalis') {
				return;
			}
			this.hint("Only a Pokemon whose form is Crimson-Fatalis can use this move.");
			if (source.species.name === 'Crimson-Fatalis') {
				this.attrLastMove('[still]');
				this.add('-fail', source, 'move: Crimson Dawn', '[forme]');
				return null;
			}
			this.attrLastMove('[still]');
			this.add('-fail', source, 'move: Crimson Dawn');
			return null;
		},
	},
	ancestralthunder: {
		num: 2025,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Ancestral Thunder",
		shortDesc: "W-Fatalis: Cannot be selected the turn after it's used.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, cantusetwice: 1},
		secondary: null,
		target: "normal",
		type: "Electric",
		onTry(source) {
			if (source.species.name === 'White-Fatalis') {
				return;
			}
			this.hint("Only a Pokemon whose form is White-Fatalis can use this move.");
			if (source.species.name === 'White-Fatalis') {
				this.attrLastMove('[still]');
				this.add('-fail', source, 'move: Ancestral Thunder', '[forme]');
				return null;
			}
			this.attrLastMove('[still]');
			this.add('-fail', source, 'move: Ancestral Thunder');
			return null;
		},
	},
	quicksandbreath: {
		num: 2026,
		accuracy: 75,
		basePower: 100,
		category: "Special",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		name: "Quicksand Breath",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	/*
	Monhun Status
	*/
	hellfirerifle: {
		num: 2027,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Hellfire Rifle",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, metronome: 1, pulse: 1},
		secondary: null,
		onAfterMove(pokemon, target, move) {
			if (this.randomChance(3, 10)) {
				target.addVolatile('blastblight');
			}
		},
		shortDesc: "30% chance to inflict blastblight.",
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	slimepunch: {
		num: 2028,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Slime Punch",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, metronome: 1},
		secondary: null,
		onAfterMove(pokemon, target, move) {
			if (this.randomChance(5, 10)) {
				target.addVolatile('blastblight');
			}
		},
		shortDesc: "50% chance to inflict blastblight.",
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	powderkeg: {
		num: 2029,
		accuracy: 100,
		basePower: 45,
		category: "Special",
		name: "Powderkeg",
		pp: 25,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, powder: 1},
		secondary: null,
		onAfterMove(pokemon, target, move) {
			if (this.randomChance(10, 10)) {
				target.addVolatile('blastblight');
			}
		},
		shortDesc: "Inflicts blastblight.",
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	blastbite: {
		num: 2030,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Blast Bite",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		secondaries: [
			{
				chance: 100,
				volatileStatus: 'flinch',
			},
		],
		onAfterMove(pokemon, target, move) {
			if (this.randomChance(1, 10)) {
				target.addVolatile('blastblight');
			}
		},
		shortDesc: "Inflicts blast. 10% chance to flinch.",
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	abyssaleruption: {
		num: 2031,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Abyssal Eruption",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		onAfterMove(pokemon, target, move) {
			if (this.randomChance(5, 10)) {
				target.addVolatile('blastblight');
			}
		},
		shortDesc: "Reduces Sp. Atk by 2. 50% chance to inflict blast.",
		target: "normal",
		type: "Dark",
		contestType: "Beautiful",
	},
	supremacysquall: {
		num: 2032,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Supremacy Squall",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		secondary: null,
		shortDesc: "Inflicts defense down.",
		volatileStatus: 'defensedown',
		target: "allAdjacentFoes",
		type: "Flying",
		zMove: {boost: {def: 1}},
		contestType: "Tough",
	},
	harshsting: {
		num: 2033,
		accuracy: 100,
		basePower: 15,
		category: "Physical",
		name: "Harsh Sting",
		pp: 35,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 100,
			status: 'defensedown',
		},
		shortDesc: "Inflicts defense down.",
		target: "normal",
		type: "Bug",
		contestType: "Clever",
	},
	decayduster: {
		num: 2034,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Decay Duster",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		volatileStatus: 'defensedown',
		shortDesc: "Hits adjacent pokemon. Inflicts defense down.",
		secondary: null,
		target: "allAdjacent",
		type: "Bug",
		contestType: "Beautiful",
	},
	slimyspit: {
		num: 2035,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Slimy Spit",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 100,
			volatileStatus: 'defensedown',
		},
		shortDesc: "100% chance to inflict Defense Down.",
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Clever",
	},
	stinkbomb: {
		num: 2036,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Stink Bomb",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'stench',
		},
		shortDesc: "30% chance to inflict stench.",
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	perfumepulse: {
		num: 2037,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Perfume Pulse",
		shortDesc: "30% chance to inflict Stench.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, pulse: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'stench',
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	phlegmshot: {
		num: 2038,
		accuracy: 80,
		basePower: 120,
		category: "Physical",
		name: "Phlegm Shot",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'fatigue',
		},
		shortDesc: "30% chance to inflict fatigue.",
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	sweetlick: {
		num: 2039,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Sweet Lick",
		pp: 30,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		shortDesc: "Inflicts Fatigue.",
		secondary: {
			chance: 100,
			volatileStatus: 'fatigue',
		},
		target: "normal",
		type: "Poison",
		contestType: "Cute",
	},
	roughhouse: {
		num: 2040,
		accuracy: 90,
		basePower: 95,
		category: "Physical",
		name: "Roughhouse",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 50,
			volatileStatus: 'bleeding',
		},
		shortDesc: "50% chance to inflict bleeding.",
		target: "normal",
		type: "Fighting",
		contestType: "Cute",
	},
	cruelclaw: {
		num: 2041,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Cruel Claw",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondaries: [
			{
				chance: 50,
				boosts: {
					def: -1,
				},
			}, {
				chance: 30,
				volatileStatus: 'bleeding',
			},
		],
		shortDesc: "50% chance to lower Defense, 30% to bleed.",
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	brimstoneblade: {
		num: 2042,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Brimstone Blade",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		critRatio: 2,
		secondary: {
			chance: 10,
			volatileStatus: 'bleeding',
		},
		shortDesc: "High crit ratio. 10% chance to bleed.",
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},
	sulfurousblade: {
		num: 2042,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Sulfurous Blade",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		critRatio: 2,
		secondary: {
			chance: 10,
			volatileStatus: 'defensedown',
		},
		shortDesc: "High crit ratio. 30% chance to inflict Def. Down.",
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
	thousandblades: {
		num: 2043,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Thousand Blades",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		critRatio: 2,
		secondary: {
			chance: 20,
			volatileStatus: 'bleeding',
		},
		shortDesc: "High crit ratio. 20% chance to bleed.",
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	snowballcannon: {
		num: 2044,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		name: "Snowball Cannon",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'snowman',
		},
		shortDesc: "10% chance to trap the foe in a Snowman.",
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	glacialgale: {
		num: 2045,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Glacial Gale",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'snowman',
		},
		shortDesc: "10% chance to trap the foe in a Snowman.",
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	oxideairstrike: {
		num: 2046,
		accuracy: 95,
		basePower: 75,
		category: "Physical",
		name: "Oxide Airstrike",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, metronome: 1, slicing: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'rusted',
		},
		shortDesc: "30% chance to inflict Rust.",
		target: "any",
		type: "Flying",
		contestType: "Cool",
	},
	dracophage: {
		num: 2047,
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "Dracophage",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		shortDesc: "Dragonblights the opponent.",
		status: 'dragonblight',
		secondary: null,
		target: "normal",
		type: "Dragon",
		zMove: {boost: {atk: 1}},
		contestType: "Beautiful",
	},
	devilsjaw: {
		num: 2048,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Devil's Jaw",
		shortDesc: "100% chance to inflict Dragonblight.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, bite: 1},
		secondary: {
			chance: 100,
			status: 'dragonblight',
		},
		target: "normal",
		type: "Dragon",
		contestType: "Clever",
	},
	seraphicshift: {
		num: 2049,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Seraphic Shift",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, bypasssub: 1},
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Disufiroa' && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				const meloettaForme = pokemon.species.id === 'disufiroasol' ? '' : '-Sol';
				pokemon.formeChange('Disufiroa' + meloettaForme, this.effect, false, '[msg]');
			}
		},
		shortDesc: "Changes Disufiroa's form.",
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	nethercurrent: {
		num: 2050,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Nether Current",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		shortDesc: "Prevents the target from switching out.",
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
	frozencleave: {
			accuracy: 100,
			basePower: 70,
			category: "Physical",
			name: "Frozen Cleave",
			pp: 20,
			priority: 0,
			flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1},
			onEffectiveness(typeMod, target, type) {
				if (type === 'Water') return 1;
			},
			secondary: {
				chance: 10,
				status: 'frz',
			},
			target: "normal",
			shortDesc: "10% chance to freeze. Super effective on Water.",
			type: "Ice",
			contestType: "Beautiful",
	},
	boomblast: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Boomblast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		secondary: null,
		onAfterMove(pokemon, target, move) {
			if (this.randomChance(5, 10)) {
				target.addVolatile('blastblight');
			}
		},
		shortDesc: "50% chance to Blast. Hits adjacent Pokemon.",
		target: "allAdjacent",
		type: "Fire",
		contestType: "Tough",
	},
	shroomshield: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shroom Shield",
		pp: 10,
		priority: 4,
		flags: {metronome: 1, noassist: 1, failcopycat: 1},
		stallingMove: true,
		volatileStatus: 'shroomshield',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					source.trySetStatus('psn', target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					source.trySetStatus('psn', target);
				}
			},
		},
		shortDesc: "Protects from damaging attacks. Contact: poison.",
		secondary: null,
		target: "self",
		type: "Grass",
	},
	risenburst: {
		accuracy: true,
		basePower: 60,
		category: "Special",
		name: "Risen Burst",
		pp: 1,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon, target) {
			move.type = '???';
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
				if (physical > special || (physical === special && this.random(2) === 0)) {
					move.category = 'Physical';
					move.flags.contact = 1;
				}
		},
		type: 'Dark',
		secondary: null,
		target: "allAdjacent",
	},
	/*
	Edits
	*/
	swift: {
		inherit: true,
		viable:true,
		desc: "This move does not check accuracy. Usually goes first.",
		shortDesc: "This move does not check accuracy. Usually goes first.",
		priority: 1,
	},
	healorder: {
		inherit: true,
		pp: 5,
	},
	hyperspacefury: {
		inherit: true,
		breaksProtect: true,
		onTry(source) {},
	},
	ivycudgel: {
		inherit: true,
		num: 904,
		onPrepareHit(target, source, move) {
			if (move.type !== "Grass") {
				this.attrLastMove('[anim] Ivy Cudgel ' + move.type);
			}
		},
		onModifyType(move, pokemon) {},
	},
	razorshell: {
		inherit: true,
		viable:true,
		desc: "20% chance to inflict Bleed",
		shortDesc: "20% chance to inflict bleed.",
		secondary: {
			chance: 20,
			volatileStatus: 'bleeding',
		},
	},
	razorleaf: {
		inherit: true,
		basePower: 60,
		viable:true,
		desc: "High critical hit ratio. 30% chance to inflict bleed.",
		shortDesc: "High critical hit ratio. 30% chance to inflict bleed.",
		secondary: {
			chance: 30,
			volatileStatus: 'bleeding',
		},
	},
	rest: {
		inherit: true,
		cantusetwice: 1,
		desc: "User sleeps 2 turns and Heals HP/Status. Can't use on consecutive turns.",
	},
	razorwind: {
		inherit: true,
		viable:true,
		onTryMove(attacker, defender, move) {},
		desc: "High critical hit ratio. 30% chance to inflict bleed.",
		shortDesc: "High critical hit ratio. 30% chance to inflict bleed.",
		secondary: {
			chance: 30,
			volatileStatus: 'bleeding',
		},
	},
	bubblebeam: {
		inherit: true,
		desc: "10% chance to inflict Bubbleblight.",
		shortDesc: "10% chance to inflict Bubbleblight.",
		secondary: {
			chance: 10,
			volatileStatus: 'bubbleblight',
		},
	},
	irontail: {
		inherit: true,
		accuracy: 90,
	},
	/*
	DROWSY EDITS
	*/
	darkvoid: {
		inherit: true,
		viable:true,
		accuracy: 80,
		onTry(source, target, move) {},
	},
	hypnosis: {
		inherit: true,
		accuracy: 85,
	},
	sing: {
		inherit: true,
		accuracy: 80,
	},
	/*
	TORQUES
	*/
	blazingtorque: {
		num: 896,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Blazing Torque",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1,
			failcopycat: 1, failmimic: 1, failinstruct: 1, nosketch: 1,
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
	},
	combattorque: {
		num: 899,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Combat Torque",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1,
			failcopycat: 1, failmimic: 1, failinstruct: 1, nosketch: 1,
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Fighting",
	},
	magicaltorque: {
		num: 900,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Magical Torque",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1,
			failcopycat: 1, failmimic: 1, failinstruct: 1, nosketch: 1,
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fairy",
	},
	noxioustorque: {
		num: 898,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Noxious Torque",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1,
			failcopycat: 1, failmimic: 1, failinstruct: 1, nosketch: 1,
		},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
	},
	wickedtorque: {
		num: 897,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Wicked Torque",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1,
			failcopycat: 1, failmimic: 1, failinstruct: 1, nosketch: 1,
		},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		target: "normal",
		type: "Dark",
	},
}
