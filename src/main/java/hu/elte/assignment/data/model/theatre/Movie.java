package hu.elte.assignment.data.model.theatre;

import hu.elte.assignment.data.model.Base;
import hu.elte.assignment.data.model.people.Person;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@XmlRootElement
@EqualsAndHashCode(callSuper = true)
public class Movie extends Base implements Serializable {

	private static final long serialVersionUID = 5724157782072623484L;

	@Column(nullable = false)
	private String name;

	@Temporal(TemporalType.DATE)
	private Date release;

	@OneToMany(mappedBy = "movie")
	private List<Screening> screenings = new ArrayList<>();

	@ManyToMany
	private List<Person> actors = new ArrayList<>();


}
