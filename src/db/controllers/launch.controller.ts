import { Launch, Rocket } from "../models";

export const launchController = {
	launches: () => Launch.findAll(),
	createLaunch: (args: any) => {
		Launch.findOrCreate({
            where: {
                flight_number: args.flight_number,
                launch_year: args.launch_year,
                mission_name: args.mission_name,
                launch_success: args.launch_success,
            }
        });
	}
};
