
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { useGetArtistDetailsQuery, useGetArtistTopChartsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);
  const { data: artistTopChartData, isFetching: isFetchingArtistTopCharts } = useGetArtistTopChartsQuery(artistId)

  if (isFetchingArtistDetails) return <Loader title="Loading artist details..." />;

  if(isFetchingArtistTopCharts) return<Loader title="Loading artist top charts..." />

  if (error) return <Error />;

  console.log(artistTopChartData, "artistTopChartData")

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        artistData={artistData?.data[0]}
      />

      <RelatedSongs
        data={artistTopChartData}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;

