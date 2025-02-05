import React, { useEffect, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";

const ReunitedStories = () => {
    const [stories, setStories] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6); 
    const [selectedStory, setSelectedStory] = useState(null);

    useEffect(() => {
        fetch(`../storiesMockData.json`)
            .then((res) => res.json())
            .then((result) => setStories(result));
    }, []);

    // Handle "See More" and "See Less" button
    const toggleVisibleCount = () => {
        setVisibleCount(visibleCount === 6 ? stories.length : 6);
    };

    // Open modal and set the selected story
    const openModal = (story) => {
        setSelectedStory(story);
        document.getElementById("storyModal").showModal();
    };

    // Handle modal close
    const closeModal = () => {
        setSelectedStory(null);
    };

    return (
        <div className="bg-gray-100 dark:bg-black py-10 px-6 my-10">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="md:text-3xl text-2xl font-bold text-gray-700 dark:text-white mb-4">Reunited and It Feels So Good!</h2>
                <p className="text-gray-600 dark:text-white mb-8">
                    Heartwarming stories of people who found their lost belongings, thanks to our platform.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories && stories.length > 0 ? (
                        stories.slice(0, visibleCount).map((story) => (
                            <div key={story.id} className="bg-white dark:bg-gray-800 flex flex-col h-full shadow-lg hover:scale-105 rounded-lg p-5">
                                <img
                                    src={story.thumbnail}
                                    alt={story.title}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{story.title}</h3>
                                <p className="text-gray-600 dark:text-gray-200 text-sm mb-4">{story.description.slice(0, 100)}...</p>
                                <button
                                    className="text-blue-500 font-medium hover:underline flex-grow mt-auto"
                                    onClick={() => openModal(story)}
                                >
                                    Read More
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full">No stories to display yet. Be the first to share yours!</p>
                    )}
                </div>

                <div className="mt-8 flex justify-center items-center gap-4">
                    {stories.length > 6 && (
                        <button
                            onClick={toggleVisibleCount}
                            className="px-6 py-2 text-white bg-gray-800 hover:bg-gray-700 rounded-lg shadow-lg"
                        >
                            {visibleCount === 6 ? "See More" : "See Less"}
                        </button>
                    )}
                    <p className="text-gray-800 dark:text-white">
                        Share Your Story and get featured🤩....
                    </p>
                </div>
            </div>

            {/* Modal for Read More */}
            <dialog id="storyModal" className="modal modal-middle backdrop-blur-md">
                <div className="modal-box dark:bg-gray-800 relative">
                    {selectedStory && (
                        <>
                            <h3 className="font-bold text-lg dark:text-white">{selectedStory.title}</h3>
                            <img
                                src={selectedStory.thumbnail}
                                alt={selectedStory.title}
                                className="w-full h-40 object-cover rounded-md my-4"
                            />
                            <p className="py-4 dark:text-gray-200">{selectedStory.description}</p>
                        </>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            {/* Close the modal */}
                            <button className="absolute top-8 right-8 font-bold text-gray-800 dark:text-white rounded-lg shadow-lg" onClick={closeModal}>
                            <FaRegWindowClose className="font-bold" />
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ReunitedStories;
