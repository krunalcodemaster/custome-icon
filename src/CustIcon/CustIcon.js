import React from "react";

export function CustIcon(props) {
  const { name, className, size } = props;
  const sizes = size === undefined ? "1em" : size;
  const addClassName = className === undefined ? "" : className;
  const Icon = ({ name, ...rest }) => {
    console.log("rest ->", rest);
    const ImportedIconRef = React.useRef(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
      setLoading(true);
      const importIcon = async () => {
        try {
          if (!name) {
            // ImportedIconRef.current = (
            //   await import(
            //     `!!@svgr/webpack?-svgo,+titleProp,+ref!./svg/logo.svg`
            //   )
            // ).default;
            return null;
          } else {
            ImportedIconRef.current = (
              await import(
                `!!@svgr/webpack?-svgo,+titleProp,+ref!./svg/${name}.svg`
              )
            ).default;
          }
        } catch (err) {
          console.log(err.message);
        } finally {
          setLoading(false);
        }
      };
      importIcon();
    }, [name]);

    if (!loading && ImportedIconRef.current) {
      const { current: ImportedIcon } = ImportedIconRef;
      return <ImportedIcon {...rest} />;
    }

    return null;
  };
  return (
    <i className={`custIcon custIcon-${name} ${addClassName} `}>
      <Icon name={name} width={sizes} height={sizes} />
    </i>
  );
}
