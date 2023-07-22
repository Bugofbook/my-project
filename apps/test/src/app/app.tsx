import styled from '@emotion/styled';
// import NxWelcome from './nx-welcome';
// import Geo from './geo';
import Geo from './geo2';
import {TaiWanMap} from '@bugofbook/react/geo';
const StyledApp = styled.div`
  // Your style here
  /* overflow: scroll; */
`;


const aaa = 630 * 1
export function App() {
  return (
    <StyledApp>
      <div>
        <div style={{border: '2px solid black', width: '400px', height: '600px'}}>
          <TaiWanMap width={400} height={600} events={true} />
        </div>
      </div>
      {/* <NxWelcome title="test" /> */}
    </StyledApp>
  );
}
// export function App() {
//   return (
//     <ParentSize>{({ width, height }) => <Geo width={width} height={height} events={true}/>}</ParentSize>
//   );
// }

export default App;
