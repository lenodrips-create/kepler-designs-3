'use client';

import { useScroll, useTransform, motion, type MotionValue } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';

interface Image {
	src: string;
	alt?: string;
	/** Optional video to play in this tile instead of the image (`src` becomes its poster). */
	video?: string;
	/** Optional WebM version, used by browsers that can't play the MP4. */
	videoWebm?: string;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: Image[];
	/** Extra scroll, in vh, held at the end with the first image filling the screen. */
	hold?: number;
	/** Rendered over the stage during the hold; receives the hold's progress (0 to 1). */
	finale?: (progress: MotionValue<number>) => ReactNode;
}

/** Plays only while on screen, so it costs nothing elsewhere on the page. */
function TileVideo({ mp4, webm, poster, label }: { mp4: string; webm?: string; poster: string; label: string }) {
	const ref = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = ref.current;
		if (!video) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			video.pause();
			return;
		}
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) video.play().catch(() => {});
				else video.pause();
			},
			{ rootMargin: '200px 0px' },
		);
		observer.observe(video);
		return () => observer.disconnect();
	}, []);

	return (
		<video
			ref={ref}
			poster={poster}
			aria-label={label}
			muted
			loop
			playsInline
			autoPlay
			preload="metadata"
			className="h-full w-full object-cover object-[42%_50%]"
		>
			<source src={mp4} type="video/mp4" />
			{webm ? <source src={webm} type="video/webm" /> : null}
		</video>
	);
}

export function ZoomParallax({ images, hold = 0, finale }: ZoomParallaxProps) {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	// The zoom runs over the original 200vh of scroll; any hold comes after it.
	const zoomEnd = 200 / (200 + hold);

	// 4.06, not 4: the first tile lands a hair past the screen edges, so no seam shows.
	const scale4 = useTransform(scrollYProgress, [0, zoomEnd], [1, 4.06]);
	const scale5 = useTransform(scrollYProgress, [0, zoomEnd], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, zoomEnd], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, zoomEnd], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, zoomEnd], [1, 9]);
	const holdProgress = useTransform(scrollYProgress, [zoomEnd, 1], [0, 1]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	return (
		<div ref={container} className="relative" style={{ height: `${300 + hold}vh` }}>
			<div className="sticky top-0 h-screen overflow-hidden">
				{images.map(({ src, alt, video, videoWebm }, index) => {
					const scale = scales[index % scales.length];

					return (
						<motion.div
							key={index}
							style={{ scale }}
							className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
						>
							<div className="relative h-[25vh] w-[25vw]">
								{video ? (
									<TileVideo mp4={video} webm={videoWebm} poster={src} label={alt || `Parallax video ${index + 1}`} />
								) : (
									<img
										src={src || '/placeholder.svg'}
										alt={alt || `Parallax image ${index + 1}`}
										loading="lazy"
										decoding="async"
										className="h-full w-full object-cover"
									/>
								)}
							</div>
						</motion.div>
					);
				})}
				{finale ? finale(holdProgress) : null}
			</div>
		</div>
	);
}
