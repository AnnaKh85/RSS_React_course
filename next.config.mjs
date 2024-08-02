/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return ([
            {
                source: "/",
                destination: "/search",
                permanent: true,
                basePath: false
            }

        ]);
    }
};

export default nextConfig;
