import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

	constructor(
		@InjectModel(Pokemon.name)
		private readonly pokemonModel: Model<Pokemon>,
	) { }

	private readonly axios: AxiosInstance = axios;

	async executeSeed() {
		await this.pokemonModel.deleteMany({}); // delete * from pokemon;

		const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

		// Metodo 1 con promesa
		//const insertPromisesArray = [];

		// Metodo 2 una sola insersion
		const pokemonToInsert: { name: string, no: number }[] = [];

		data.results.forEach(async ({ name, url }) => {
			const segments = url.split('/');
			const no = +segments[segments.length - 2];

			//console.log({ name, no });
			//Metodo tradicional
			//const pokemon = await this.pokemonModel.create({ name, no });

			// Metodo 1 con promesas
			//insertPromisesArray.push(this.pokemonModel.create({ name, no }));

			// Metodo 2 una sola insersion
			pokemonToInsert.push({ name, no });
		});

		// Metodo 1 con promesas
		//await Promise.all(insertPromisesArray);

		// Metodo 2 una sola insersion
		this.pokemonModel.insertMany(pokemonToInsert);

		return 'seed executed';
	}
}