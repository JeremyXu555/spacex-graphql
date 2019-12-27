import { Dragon } from "../models";

export const dragonController = {
	dragons: () => Dragon.findAll(),
	createDragon: (args: any) => {
        return Dragon
                .findOrCreate({
                    where: {
                        name: args.name,
                        type: args.type,
                        heat_shield: JSON.stringify(args.heat_shield),
                    }
                })
                .then(([Dragon]) => {
                    return Dragon.get({ plain: true });
                });
	}
};
