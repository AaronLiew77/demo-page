"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import posthog from 'posthog-js';

const images = [
    "https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fbusiness_insurance_f9cf38298e.jpg&w=1080&q=75",
    "https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2FMicrosoft_Teams_image_7_08183417ec.png&w=1080&q=75",
    "https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fkinesis_tablet_208a22e8f7.jpg&w=1080&q=75",
    "https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fwhite_van_coming_arund_corner_2e0dbbfa47.jpeg&w=1920&q=75",
    "https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fbusiness_insurance_f9cf38298e.jpg&w=1080&q=75",
    "https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2FAdobe_Stock_49661077_1_ea2304ffcf.jpeg&w=1920&q=75",
    "https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fbusiness_insurance_f9cf38298e.jpg&w=1080&q=75",
    "https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fenergy_enterprise_bb35bfd9d2.jpg&w=1080&q=75",
    "https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2F8561f5e826ee27f492d4c0fa008aadc7_ebe83c0c71.jpg&w=1080&q=75",
    "https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2FAdobe_Stock_55328545_fd82b06c89.jpeg&w=1080&q=75",
    "https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fbusiness_insurance_f9cf38298e.jpg&w=1080&q=75",
    "https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fbusiness_insurance_f9cf38298e.jpg&w=1080&q=75",
    "https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fcyber_insurance_295c22d40b.jpg&w=1080&q=75",
];

export default function ImageGallery() {
    const galleryRef = useRef<HTMLDivElement>(null);
    const hasTracked = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasTracked.current) {
                        hasTracked.current = true;
                        posthog.capture('image_gallery_viewed', {
                            total_images: images.length,
                        });
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (galleryRef.current) {
            observer.observe(galleryRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={galleryRef} className="grid grid-cols-3 gap-4 max-w-7xl mx-auto">
          {images.map((image, index) => (
            <Image key={index} src={image} id={`image-${index}-client-side`} alt="SaaSify" width={1080} height={500} />
          ))}
        </div>
    )
}