import { useState } from 'react';
import { AppLayout, type PageKey } from './layout/AppLayout';
import { TaskListPage } from './pages/TaskListPage';
import { ComponentGalleryPage } from './pages/ComponentGalleryPage';
import { ToastContainer } from './components/Toast/Toast';

function App() {
  const [page, setPage] = useState<PageKey>('task-list');

  const breadcrumb =
    page === 'task-list'
      ? [{ label: '首页' }, { label: '任务管理' }, { label: '任务管理列表' }]
      : [{ label: '首页' }, { label: '设计规范' }, { label: '组件规范速查' }];

  return (
    <>
      <AppLayout activeKey={page} onSelect={setPage} breadcrumb={breadcrumb}>
        {page === 'task-list' ? <TaskListPage /> : <ComponentGalleryPage />}
      </AppLayout>
      <ToastContainer />
    </>
  );
}

export default App;
