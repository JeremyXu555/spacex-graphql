import { Launch } from "./launch.model";

const launchController = {
	launches: () => Launch.find({}),
	createLaunch: (launch: any) => {
		const newLaunch = new Launch({
            flight_number: launch.flight_number,
            launch_year: launch.launch_year,
            mission_name: launch.mission_name,
            launch_success: launch.launch_success,
        });
		return newLaunch.save();
	}
};

export { launchController };
