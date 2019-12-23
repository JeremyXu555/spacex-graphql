import { Rocket } from "../models";

export const rocketController = {
    rockets: () => Rocket.findAll(),
	createRocket: (rocket: any) => {
        return Rocket
                .findOrCreate({
                    where:{
                        active: rocket.active,
                        stages: rocket.stages,
                        launch_ids: rocket.launch_ids,
                        boosters: rocket.boosters,
                        cost_per_launch: rocket.cost_per_launch,
                        success_rate_pct: rocket.success_rate_pct,
                        first_flight: rocket.first_flight,
                        country: rocket.country,
                        company: rocket.company,
                    }
                })
                .then(([rocket]) => {
                    return rocket.get({ plain: true });
                });
	}
};

