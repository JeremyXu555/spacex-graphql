import { Rocket } from "../models";

export const rocketController = {
    newRocket: {},
    rockets: () => Rocket.findAll({}),
	createRocket: (rocket: any, newRocket:any) => {
        newRocket = Rocket
                    .findOrCreate({
                        where:{
                            active: rocket.active,
                            stages: rocket.stages,
                            boosters: rocket.boosters,
                            cost_per_launch: rocket.cost_per_launch,
                            success_rate_pct: rocket.success_rate_pct,
                            first_flight: rocket.first_flight,
                            country: rocket.country,
                            company: rocket.company,
                        }
                    })
                    .then(([rocket]) => {
                        newRocket = rocket.get({ plain: true });
                        return newRocket;
                    });
        return newRocket;
	}
};

