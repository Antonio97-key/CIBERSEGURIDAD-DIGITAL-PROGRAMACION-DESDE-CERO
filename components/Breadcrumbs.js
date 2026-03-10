import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Breadcrumbs() {
    const router = useRouter();
    const pathArray = router.pathname.split('/').filter(path => path);

    // Mapeo básico de URLs a nombres legibles
    const generateBreadcrumbs = () => {
        const breadcrumbs = [
            { href: '/', label: 'Inicio' }
        ];

        let currentPath = '';
        pathArray.forEach((path, index) => {
            currentPath += `/${path}`;
            // Formatear el label: capitalizar y reemplazar guiones
            const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
            
            // Reemplazar dinámicas como [module] en el label (por simplicidad, mostraremos del query si existe)
            const queryKeys = Object.keys(router.query);
            let finalLabel = label;
            if (path.startsWith('[') && path.endsWith(']')) {
                const queryKey = path.slice(1, -1);
                if (router.query[queryKey]) {
                    finalLabel = String(router.query[queryKey]).charAt(0).toUpperCase() + String(router.query[queryKey]).slice(1).replace(/-/g, ' ');
                }
            }

            breadcrumbs.push({
                href: currentPath,
                label: finalLabel
            });
        });

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    if (breadcrumbs.length <= 1) return null;

    return (
        <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                        <li key={crumb.href} className="flex items-center">
                            {index > 0 && (
                                <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--color-text-muted)' }}>
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                            {isLast ? (
                                <span className="font-semibold" style={{ color: 'var(--color-primary)' }} aria-current="page">
                                    {crumb.label}
                                </span>
                            ) : (
                                <Link href={crumb.href} 
                                      className="transition-colors hover:underline"
                                      style={{ color: 'var(--color-text-muted)' }}>
                                    {crumb.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
