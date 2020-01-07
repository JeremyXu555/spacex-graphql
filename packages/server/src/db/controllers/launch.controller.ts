import { Launch } from "../models";

export const launchController = {
	launches: () => Launch.findAll(),
	createLaunch: (args: any) => {
        return Launch
                .findOrCreate({
                    where: {
                        rocket_id: args.rocket_id,
                        flight_number: args.flight_number,
                        launch_year: args.launch_year,
                        mission_name: args.mission_name,
                        launch_success: args.launch_success,
                    }
                })
                .then(([launch]) => {
                    return launch.get({ plain: true });
                });
	}
};
