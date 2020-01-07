import { Rocket } from "./rocket.model";

const rocketController = {
	rockets: () => Rocket.find({}),
	createRocket: (rocket: any) => {
		const newRocket = new Rocket({
            id: rocket.id,
            active: rocket.active,
            stages: rocket.stages,
            boosters: rocket.boosters,
            cost_per_launch: rocket.cost_per_launch,
            success_rate_pct: rocket.success_rate_pct,
            first_flight: rocket.first_flight,
            country: rocket.country,
            company: rocket.company,
        });
		return newRocket.save();
	}
};

export { rocketController };
