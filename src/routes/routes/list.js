import { getAllRoutes, getListOfRegions, getListOfSeasons, getRoutesByRegion, getRoutesBySeason } from '../../models/model.js';

export default async (req, res) => {
    const { region, season } = req.query;
    
    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();
    
    // Start with all routes
    let routes = await getAllRoutes();
    
    // Filter by region if specified
    if (region && region !== 'all') {
        routes = routes.filter(route => route.region.toLowerCase() === region.toLowerCase());
    }
    
    // Filter by season if specified
    if (season && season !== 'all') {
        routes = routes.filter(route => route.bestSeason.toLowerCase() === season.toLowerCase());
    }

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        query: { region, season }
    });
};