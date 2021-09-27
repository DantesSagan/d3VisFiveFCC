import { Link } from 'react-router-dom';
import * as ROUTES from './routes/routes';

export default function Header() {
  return (
    <div>
      <header className='mt-10'>
        <nav className='grid grid-cols-1 rounded-t-lg p-2 border-4 border-red-600 shadow-inner font-mono gridCol '>
          <div className='border border-red-700 rounded-2xl m-2 '>
            <div className='button p-4 border border-red-700 rounded-2xl'>
              <Link to='/'>Home</Link>
            </div>
            <div className='button p-2'>
              <Link to={ROUTES.KickStarterMap}>KickStarterMap</Link>
            </div>
            <div className='button p-2'>
              <Link to={ROUTES.TreemapMovieSales}>MovieSales</Link>
            </div>
            <div className='button p-2'>
              <Link to={ROUTES}>VideoGameSales</Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
