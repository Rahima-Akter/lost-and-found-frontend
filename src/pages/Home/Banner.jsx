import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const Banner = () => {
    const slides = [
        {
            id: 1,
            title: "Find Your Lost Belongings",
            description:
                "Easily search and connect with others to recover your misplaced items. Together, we make reuniting simple!",
            image:
                "https://media.istockphoto.com/id/1409298953/photo/real-estate-agents-shake-hands-after-the-signing-of-the-contract-agreement-is-complete.jpg?s=612x612&w=0&k=20&c=SFybbpGMB0wIoI0tJotFqptzAYK_mICVITNdQIXqnyc=",
        },
        {
            id: 2,
            title: "Post About Lost Items",
            description:
                "Create detailed posts about lost items and let others assist you in finding them quickly and efficiently.",
            image:
                "https://as2.ftcdn.net/v2/jpg/04/96/81/65/1000_F_496816599_uWVEiDLd674lymUwrepytgUfMnHWLkmQ.jpg",
        },
        {
            id: 3,
            title: "Build a Helping Community",
            description:
                "Join our platform to build a community that thrives on helping each other recover what's lost.",
            image:
                "https://media.istockphoto.com/id/1472932742/photo/group-of-multigenerational-people-hugging-each-others-support-multiracial-and-diversity.jpg?s=612x612&w=0&k=20&c=Zm1MthU_G_LzfjBFBaMORRnuBhMsCjPQ38Ksfg4zl9g=",
        },
    ];

    return (
        <div className="relative">
            <Swiper
                modules={[Pagination, Autoplay]}
                autoplay={{ delay: 5000 }}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                className="w-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        {/* Background Image with Overlay */}
                        <div
                            className="relative h-[500px] w-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                            }}
                        >
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                            {/* Text Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                                <motion.h2
                                    className="text-4xl md:text-6xl font-bold"
                                    initial={{ opacity: 1, color: 'yellow' }}
                                    animate={{
                                        color: ['#FF6347', '#FFD700', '#32CD32', '#8A2BE2'], 
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: 'loop', 
                                        ease: 'linear',
                                    }}
                                >
                                    {slide.title}
                                </motion.h2>
                                <motion.p
                                    className="mt-4 text-lg md:text-2xl max-w-3xl"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.2 }}
                                >
                                    {slide.description}
                                </motion.p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
