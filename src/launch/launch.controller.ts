import { Launch } from "./launch.model";
import { Rocket } from "../rocket/rocket.model";

const launchController = {
	launches: () => Launch.find({}),
	createLaunch: (args: any) => {
        const newRocket = new Rocket({
            id: args.rocket.id,
            active: args.rocket.active,
            stages: args.rocket.stages,
            boosters: args.rocket.boosters,
            cost_per_launch: args.rocket.cost_per_launch,
            success_rate_pct: args.rocket.success_rate_pct,
            first_flight: args.rocket.first_flight,
            country: args.rocket.country,
            company: args.rocket.company,
        });
        newRocket.save();

		const newLaunch = new Launch({
            flight_number: args.flight_number,
            launch_year: args.launch_year,
            mission_name: args.mission_name,
            launch_success: args.launch_success,
            rocket: newRocket,
        });
		return newLaunch.save();
	}
};

export { launchController };
