const securityHeaders=[{key:'X-Content-Type-Options',value:'nosniff'},{key:'X-Frame-Options',value:'SAMEORIGIN'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'}];
const nextConfig={images:{remotePatterns:[{protocol:'https',hostname:'**'}]},async headers(){return[{source:'/(.*)',headers:securityHeaders}]}}
export default nextConfig;
