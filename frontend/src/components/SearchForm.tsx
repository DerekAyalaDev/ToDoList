import { SearchSelect } from './SearchSelect';
import '../styles/SearchFormStyles.css';
export const SearchForm = () => {
  const priorityOptions = [
    { value: 'All', label: 'All' },
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
  ];

  const stateOptions = [
    { value: 'All', label: 'All' },
    { value: 'true', label: 'Done' },
    { value: 'false', label: 'Undone' },
  ];
  return (
    <form className='form'>
      <div className='form-field'>
        <label htmlFor="name">Name</label>
        <input className='form-input' type="text" id="name" />
      </div>
      <SearchSelect id="priority" label="Priority" options={priorityOptions}/>
      <div className='row-button'>
        <SearchSelect id="state" label='State' options={stateOptions}/>
        <button className='form-btn' type="submit">Search</button>
      </div>
    </form>
  );
}