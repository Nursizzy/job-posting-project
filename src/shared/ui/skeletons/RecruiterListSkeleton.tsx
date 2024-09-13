import {Flex} from 'antd';
import SkeletonInput from 'antd/es/skeleton/Input';

export const RecruiterListSkeleton = () => (
  <Flex vertical gap={4} style={{ width: '100%' }}>
    <SkeletonInput active size="small" style={{ width: '200px' }} />

    <SkeletonInput active size="large" style={{ width: '100%' }} />
  </Flex>
);
