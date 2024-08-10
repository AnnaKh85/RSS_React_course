/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return ([
            {
                source: "/",
                destination: "/1",
                permanent: true,
                basePath: false
            }

        ]);
    }
};

export default nextConfig;
