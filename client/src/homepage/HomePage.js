import logo from './images/logo.svg';
import ChessSet from './images/ChessSet.jpg';
import './homePageStyleSheet.css';
import NavBar from './components/NavBar/NavBar.js';
import PersonalCalendar from './components/PersonalCalendar/PersonalCalendar.js';
import PopularActivities from './components/PopularActivities/PopularActivities.js';

function HomePage() {
  const ActivityList = [
    {ActivityPic : ChessSet,
    ActivityTitle : 'Chess',
    ActivityDescription : 'Weekly chess tournament'},
    {ActivityPic : 'https://www.bhf.org.uk/-/media/images/information-support/heart-matters/heart-matters/summer-2018/activity/tennis_racket_balls_ss_0618_noexp_620x400.jpg?rev=c18a71fbd05e4a91b4bbc40af01aafaa&hash=B6D9F53AC70899560495FC5D3205784D',
    ActivityTitle : 'Tennis',
    ActivityDescription : 'Casual tennis games every thursday'},
    {ActivityPic : 'https://www.discoverycommons.com/wp-content/uploads/2023/01/word-trivia-on-colorful-wooden-cubes.jpg',
    ActivityTitle : 'Trivia',
    ActivityDescription : 'Trivia nights held every friday'},
    {ActivityPic : 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
    ActivityTitle : 'Book Club',
    ActivityDescription : 'Books clubs held every monday and tuesday'},
    {ActivityPic : 'https://betterbody.ie/wp-content/uploads/elementor/thumbs/strong-man-training-in-gym-1-scaled-puc6dnltxn54i7tqe8yfryh0a4wn9r8z3ewgicqsqo.jpg',
    ActivityTitle : 'Gym',
    ActivityDescription : 'Student gym open 24/7'},
    {ActivityPic : 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/12/cobra-pose-yoga-back-bend-1296x728-header.jpg?w=1155&h=1528',
    ActivityTitle : 'Yoga',
    ActivityDescription : 'Yoga classes held every wednesday and friday'},
    {ActivityPic : 'https://img.quizlet.com/kdanz-o.jpg',
    ActivityTitle : 'Music Club',
    ActivityDescription : 'Musical meet ups to practice together'},
    {ActivityPic : 'https://assets.publishing.service.gov.uk/government/uploads/system/uploads/image_data/file/176455/s960_Football_gov.uk.jpg',
    ActivityTitle : 'Football',
    ActivityDescription : 'Weekly football matches held every saturday'},
  ]
  return (
    <div className="App" >
        <NavBar profilePic={logo} userName='Bradley Morris'></NavBar>
        <PersonalCalendar></PersonalCalendar>
        <PopularActivities activities={ActivityList}></PopularActivities>
    </div>
  );
}

export default HomePage
