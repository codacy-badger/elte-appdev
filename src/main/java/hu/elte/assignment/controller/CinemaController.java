package hu.elte.assignment.controller;

import hu.elte.assignment.config.DTO;
import hu.elte.assignment.data.dto.control.FilterDTO;
import hu.elte.assignment.data.dto.theatre.MovieDTO;
import hu.elte.assignment.data.model.theatre.Movie;
import hu.elte.assignment.data.repository.theatre.CinemaRepository;
import hu.elte.assignment.data.repository.theatre.MovieRepository;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Nullable;
import javax.validation.Valid;

import static lombok.AccessLevel.PRIVATE;

@RestController
@RequestMapping("/rest/cinema")
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class CinemaController {

	MovieRepository movieRepository;
	CinemaRepository cinemaRepository;
	ModelMapper modelMapper;

	@Autowired
	public CinemaController(MovieRepository movieRepository, CinemaRepository cinemaRepository, ModelMapper modelMapper) {
		this.movieRepository = movieRepository;
		this.cinemaRepository = cinemaRepository;
		this.modelMapper = modelMapper;
	}

	@PreAuthorize("hasAuthority('READ')")
	@GetMapping("/movie")
	public ResponseEntity<Iterable<Movie>> readMovies() {
		return ResponseEntity.ok(this.movieRepository.findAll());
	}

	@GetMapping("/movie/{id}")
	public ResponseEntity<Movie> readMovie(@PathVariable("id") Integer id) {
		return this.movieRepository.findById(id)
				.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.noContent().build());
	}

	@PostMapping("/movie")
	public ResponseEntity<Movie> createMovie(@Valid @RequestBody() MovieDTO movieDTO) {
		Movie movie = modelMapper.map(movieDTO, Movie.class);
		return ResponseEntity.ok(this.movieRepository.save(movie));
	}

	@DeleteMapping("/movie/{id}")
	public void deleteMovie(@PathVariable("id") Integer id) {
		this.movieRepository.deleteById(id);
	}

	@PutMapping("/movie")
	public Movie updateMovie(@DTO(MovieDTO.class) @Valid @RequestBody() Movie movie) {
		//Movie movie = modelMapper.map(movieDTO, Movie.class);
		return this.movieRepository.save(movie);
	}


}
