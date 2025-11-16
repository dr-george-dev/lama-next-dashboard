const Announcement = () => {
    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Announcement</h1>
                <span className="text-xs text-gray">View All</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <div className="bg-drSkyLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">Lorem, ipsum dolor.</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                            20/10/20
                        </span>
                    </div>
                    <p className="text-sm text-gray-400 rounded-md px-1 py-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                        maiores voluptate, quia consequuntur quam nam atque nulla, similique
                        perspiciatis nemo libero!
                    </p>
                </div>
                <div className="bg-drPurpleLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">Lorem, ipsum dolor.</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                            20/10/20
                        </span>
                    </div>
                    <p className="text-sm text-gray-400  rounded-md px-1 py-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                        maiores voluptate, quia consequuntur quam nam atque nulla, similique
                        perspiciatis nemo libero!
                    </p>
                </div>
                <div className="bg-drYellowLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">Lorem, ipsum dolor.</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                            20/10/20
                        </span>
                    </div>
                    <p className="text-sm text-gray-400  rounded-md px-1 py-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                        maiores voluptate, quia consequuntur quam nam atque nulla, similique
                        perspiciatis nemo libero!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Announcement;
