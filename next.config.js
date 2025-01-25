/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // private 디렉토리의 코드를 빌드에 포함
    config.resolve.modules.push(`${__dirname}/private`);
    return config;
  },
};

module.exports = nextConfig;
