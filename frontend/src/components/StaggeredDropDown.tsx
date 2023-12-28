import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";
import { IconType } from "react-icons";

interface DropdownOption {
  text: string;
  Icon: IconType;
  onClick?: () => void;
}

interface StaggeredDropDownProps {
  title: string;
  options: DropdownOption[];
}

const StaggeredDropDown: React.FC<StaggeredDropDownProps> = ({ title, options }) => {
  const [open, setOpen] = useState(false);
  

  return (
    <div onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}>
      <motion.div 
        animate={open ? "open" : "closed"} 
        className="relative"
        >
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors"
        >
          <span className="font-medium text-sm">{title}</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute left-[50%] w-48 overflow-hidden"
        >
          {options.map((option, index) => (
          <Option key={index} text={option.text} Icon={option.Icon} setOpen={setOpen} onClick={option.onClick} />
        ))}     
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({
  text,
  Icon,
  setOpen,
  onClick,
}: {
  text: string;
  Icon: IconType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: () => void;
}) => {
  const handleClick = () => {
    setOpen(false);
    if (onClick) onClick();
  };
  return (
    <motion.li
      variants={itemVariants}
      onClick={handleClick}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};