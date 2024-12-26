import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LostAndFoundStats = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        // Simulated API call for stats
        const fetchStats = () => {
            const mockStats = {
                itemsReturned: 1234,
                activeUsers: 789,
                successStories: 567,
                itemsListed: 342,
            };
            setStats(mockStats);
        };

        fetchStats();
    }, []);

    // Variants for infinite wave motion
    const waveVariants = {
        start: { y: 0 },
        end: { y: [0, -10, 10, -10, 0] }, // Creates a smooth wave motion
    };

    return (
        <div className="py-10 px-6 my-10">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    Lost & Found in Numbers
                </h2>
                <p className="text-gray-600 mb-12 text-lg">
                    Witness the incredible impact of our community as we connect people with their lost belongings every day.
                </p>

                {stats ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Cards with infinite wave motion */}
                        <motion.div
                            variants={waveVariants}
                            initial="start"
                            animate="end"
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="p-5 rounded-lg shadow-lg text-white"
                            style={{
                                background: "linear-gradient(135deg, #667eea, #764ba2)",
                            }}
                        >
                            <h3 className="text-5xl font-bold mb-2">{stats.itemsReturned}</h3>
                            <p className="text-lg">Items Returned</p>
                        </motion.div>
                        <motion.div
                            variants={waveVariants}
                            initial="start"
                            animate="end"
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="p-5 rounded-lg shadow-lg text-white"
                            style={{
                                background: "linear-gradient(135deg, #43cea2, #185a9d)",
                            }}
                        >
                            <h3 className="text-5xl font-bold mb-2">{stats.activeUsers}</h3>
                            <p className="text-lg">Active Users</p>
                        </motion.div>
                        <motion.div
                            variants={waveVariants}
                            initial="start"
                            animate="end"
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="p-5 rounded-lg shadow-lg text-white"
                            style={{
                                background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
                            }}
                        >
                            <h3 className="text-5xl font-bold mb-2">{stats.successStories}</h3>
                            <p className="text-lg">Success Stories</p>
                        </motion.div>
                        <motion.div
                            variants={waveVariants}
                            initial="start"
                            animate="end"
                            transition={{
                                duration: 3.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="p-5 rounded-lg shadow-lg text-white"
                            style={{
                                background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
                            }}
                        >
                            <h3 className="text-5xl font-bold mb-2">{stats.itemsListed}</h3>
                            <p className="text-lg">Items Listed</p>
                        </motion.div>
                    </div>
                ) : (
                    <p className="text-gray-500">Loading stats...</p>
                )}
            </div>
        </div>
    );
};

export default LostAndFoundStats;
